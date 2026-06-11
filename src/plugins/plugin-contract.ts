import type { SignatureConfig } from "../core/signature-types";

export interface SignaturePlugin {
  id: string;
  name: string;
  transform(config: Readonly<SignatureConfig>): SignatureConfig;
}
