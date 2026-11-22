import { HID_FILTERS, REPORT_ID } from "../protocol/constants.js";
import { checkWebHidSupport } from "./browserSupport.js";

export class WebHidTransport {
  constructor(hidDevice) {
    this.device = hidDevice;
    this.kind = "webhid";
    this.info = {
      productName: hidDevice.productName || "Xiaomi Power Bank",
      vendorId: hidDevice.vendorId,
      productId: hidDevice.productId,
    };
  }

  static isSupported() {
    return checkWebHidSupport().supported;
  }

  static async request() {
    if (!WebHidTransport.isSupported()) {
      throw new Error("Current browser does not support WebHID");
    }
    const devices = await navigator.hid.requestDevice({ filters: HID_FILTERS });
    if (!devices.length) return null;
    return new WebHidTransport(devices[0]);
  }

  async open() {
    if (!this.device.opened) {
      await this.device.open();
    }
  }

  async close() {
    if (this.device.opened) {
      await this.device.close();
    }
  }

  async send(frame) {
    await this.device.sendReport(REPORT_ID, frame);
  }

  onInputReport(handler) {
    const listener = (event) => {
      handler(new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength));
    };
    this.device.addEventListener("inputreport", listener);
    return () => this.device.removeEventListener("inputreport", listener);
  }

  onDisconnect(handler) {
    const listener = (event) => {
      if (event.device === this.device) handler();
    };
    navigator.hid.addEventListener("disconnect", listener);
    return () => navigator.hid.removeEventListener("disconnect", listener);
  }
}
