export type CloudinaryResponse = {
  public_id: string;
  version: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  resource_type: string;
  tags: Array<string>;
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  signature: string;
  original_filename: string;
};
