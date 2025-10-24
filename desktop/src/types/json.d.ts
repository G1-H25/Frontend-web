import type { PacketDetailType } from "../features/packets/packetDetailSlice";

declare module "*.json" {
  const value: PacketDetailType;
  export default value;
}
