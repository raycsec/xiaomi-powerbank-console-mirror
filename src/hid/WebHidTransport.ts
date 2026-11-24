import type { HidDeviceInfo, HidTransport } from "../types/domain.js";
import { HID_FILTERS, REPORT_ID } from "../protocol/constants.js";
import { checkWebHidSupport } from "./browserSupport.js";

export class WebHidTransport implements HidTransport {
  readonly device: HIDDevice;
  readonly kind = "webhid" as const;
  readonly info: HidDeviceInfo;

  constructor(hidDevice: HIDDevice) {
    this.device = hidDevice;
    this.info = {
      productName: hidDevice.productName || "Xiaomi Power Bank",
      vendorId: hidDevice.vendorId,
      productId: hidDevice.productId,
    };
  }

  static isSupported(): boolean {
    return checkWebHidSupport().supported;
  }

  static async request(): Promise<WebHidTransport | null> {
    if (!WebHidTransport.isSupported() || !navigator.hid) {
      throw new Error("Current browser does not support WebHID");
    }
    const devices = await navigator.hid.requestDevice({ filters: HID_FILTERS });
    if (!devices.length) return null;
    return new WebHidTransport(devices[0]);
  }

  async open(): Promise<void> {
    if (!this.device.opened) {
      await this.device.open();
    }
  }

  async close(): Promise<void> {
    if (this.device.opened) {
      await this.device.close();
    }
  }

  async send(frame: Uint8Array): Promise<void> {
    await this.device.sendReport(REPORT_ID, frame as BufferSource);
  }

  onInputReport(handler: (data: Uint8Array) => void): () => void {
    const listener = (event: HIDInputReportEvent): void => {
      handler(new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength));
    };
    this.device.addEventListener("inputreport", listener);
    return () => this.device.removeEventListener("inputreport", listener);
  }

  onDisconnect(handler: () => void): () => void {
    const listener = (event: HIDConnectionEvent): void => {
      if (event.device === this.device) handler();
    };
    navigator.hid?.addEventListener("disconnect", listener);
    return () => navigator.hid?.removeEventListener("disconnect", listener);
  }
}
