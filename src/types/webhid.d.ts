interface HIDDeviceFilter {
  vendorId?: number;
  productId?: number;
  usagePage?: number;
  usage?: number;
}

interface HIDInputReportEvent extends Event {
  readonly device: HIDDevice;
  readonly reportId: number;
  readonly data: DataView;
}

interface HIDConnectionEvent extends Event {
  readonly device: HIDDevice;
}

interface HIDDevice extends EventTarget {
  readonly opened: boolean;
  readonly vendorId: number;
  readonly productId: number;
  readonly productName: string;
  open(): Promise<void>;
  close(): Promise<void>;
  sendReport(reportId: number, data: BufferSource): Promise<void>;
  addEventListener(type: "inputreport", listener: (ev: HIDInputReportEvent) => void): void;
  removeEventListener(type: "inputreport", listener: (ev: HIDInputReportEvent) => void): void;
}

interface HID extends EventTarget {
  getDevices(): Promise<HIDDevice[]>;
  requestDevice(options: { filters: HIDDeviceFilter[] }): Promise<HIDDevice[]>;
  addEventListener(type: "disconnect", listener: (ev: HIDConnectionEvent) => void): void;
  removeEventListener(type: "disconnect", listener: (ev: HIDConnectionEvent) => void): void;
}

interface Navigator {
  readonly hid?: HID;
}

declare var process: {
  env?: Record<string, string | undefined>;
  versions?: { node?: string };
} | undefined;
