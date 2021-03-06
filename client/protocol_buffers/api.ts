/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum MessageType {
  undefined = 0,
  version = 1,
  hash = 2,
  chunk = 3,
  size = 4,
  crc32 = 5,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "undefined":
      return MessageType.undefined;
    case 1:
    case "version":
      return MessageType.version;
    case 2:
    case "hash":
      return MessageType.hash;
    case 3:
    case "chunk":
      return MessageType.chunk;
    case 4:
    case "size":
      return MessageType.size;
    case 5:
    case "crc32":
      return MessageType.crc32;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.undefined:
      return "undefined";
    case MessageType.version:
      return "version";
    case MessageType.hash:
      return "hash";
    case MessageType.chunk:
      return "chunk";
    case MessageType.size:
      return "size";
    case MessageType.crc32:
      return "crc32";
    default:
      return "UNKNOWN";
  }
}

export enum FileType {
  DAT = 0,
  BIN = 1,
  UNRECOGNIZED = -1,
}

export function fileTypeFromJSON(object: any): FileType {
  switch (object) {
    case 0:
    case "DAT":
      return FileType.DAT;
    case 1:
    case "BIN":
      return FileType.BIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FileType.UNRECOGNIZED;
  }
}

export function fileTypeToJSON(object: FileType): string {
  switch (object) {
    case FileType.DAT:
      return "DAT";
    case FileType.BIN:
      return "BIN";
    default:
      return "UNKNOWN";
  }
}

export enum Error {
  NONE = 0,
  GENERIC = 1,
  UNHANDLED_MESSAGE = 2,
  UNRECOGNIZED = -1,
}

export function errorFromJSON(object: any): Error {
  switch (object) {
    case 0:
    case "NONE":
      return Error.NONE;
    case 1:
    case "GENERIC":
      return Error.GENERIC;
    case 2:
    case "UNHANDLED_MESSAGE":
      return Error.UNHANDLED_MESSAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Error.UNRECOGNIZED;
  }
}

export function errorToJSON(object: Error): string {
  switch (object) {
    case Error.NONE:
      return "NONE";
    case Error.GENERIC:
      return "GENERIC";
    case Error.UNHANDLED_MESSAGE:
      return "UNHANDLED_MESSAGE";
    default:
      return "UNKNOWN";
  }
}

export interface API {
  request: Request | undefined;
  response: Response | undefined;
  error: Error | undefined;
}

export interface Response {
  type: MessageType;
  version: string | undefined;
  hash: string | undefined;
  size: SizeResponse | undefined;
  chunk: ChunkResponse | undefined;
  crc32: CRC32Response | undefined;
}

export interface Request {
  type: MessageType;
  version: VersionRequest | undefined;
  hash: HashRequest | undefined;
  chunk: ChunkRequest | undefined;
  size: SizeRequest | undefined;
  crc32: ChunkRequest | undefined;
}

export interface SizeResponse {
  fileType: FileType;
  value: number;
}

export interface ChunkResponse {
  fileType: FileType;
  start: number;
  length: number;
  data: Uint8Array;
  crc32?: number | undefined;
}

export interface CRC32Response {
  fileType: FileType;
  start: number;
  length: number;
  value: number;
}

export interface VersionRequest {
  model: string;
  hardware: string;
}

export interface HashRequest {
  model: string;
  hardware: string;
  version: string;
}

export interface ChunkRequest {
  hash: string;
  fileType: FileType;
  start: number;
  length: number;
  includeCrc32?: boolean | undefined;
}

export interface SizeRequest {
  hash: string;
  fileType: FileType;
}

function createBaseAPI(): API {
  return { request: undefined, response: undefined, error: undefined };
}

export const API = {
  encode(message: API, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.request !== undefined) {
      Request.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    if (message.response !== undefined) {
      Response.encode(message.response, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      writer.uint32(24).int32(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): API {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAPI();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = Request.decode(reader, reader.uint32());
          break;
        case 2:
          message.response = Response.decode(reader, reader.uint32());
          break;
        case 3:
          message.error = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): API {
    return {
      request: isSet(object.request)
        ? Request.fromJSON(object.request)
        : undefined,
      response: isSet(object.response)
        ? Response.fromJSON(object.response)
        : undefined,
      error: isSet(object.error) ? errorFromJSON(object.error) : undefined,
    };
  },

  toJSON(message: API): unknown {
    const obj: any = {};
    message.request !== undefined &&
      (obj.request = message.request
        ? Request.toJSON(message.request)
        : undefined);
    message.response !== undefined &&
      (obj.response = message.response
        ? Response.toJSON(message.response)
        : undefined);
    message.error !== undefined &&
      (obj.error =
        message.error !== undefined ? errorToJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<API>, I>>(object: I): API {
    const message = createBaseAPI();
    message.request =
      object.request !== undefined && object.request !== null
        ? Request.fromPartial(object.request)
        : undefined;
    message.response =
      object.response !== undefined && object.response !== null
        ? Response.fromPartial(object.response)
        : undefined;
    message.error = object.error ?? undefined;
    return message;
  },
};

function createBaseResponse(): Response {
  return {
    type: 0,
    version: undefined,
    hash: undefined,
    size: undefined,
    chunk: undefined,
    crc32: undefined,
  };
}

export const Response = {
  encode(
    message: Response,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.version !== undefined) {
      writer.uint32(18).string(message.version);
    }
    if (message.hash !== undefined) {
      writer.uint32(26).string(message.hash);
    }
    if (message.size !== undefined) {
      SizeResponse.encode(message.size, writer.uint32(34).fork()).ldelim();
    }
    if (message.chunk !== undefined) {
      ChunkResponse.encode(message.chunk, writer.uint32(42).fork()).ldelim();
    }
    if (message.crc32 !== undefined) {
      CRC32Response.encode(message.crc32, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.hash = reader.string();
          break;
        case 4:
          message.size = SizeResponse.decode(reader, reader.uint32());
          break;
        case 5:
          message.chunk = ChunkResponse.decode(reader, reader.uint32());
          break;
        case 6:
          message.crc32 = CRC32Response.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
      version: isSet(object.version) ? String(object.version) : undefined,
      hash: isSet(object.hash) ? String(object.hash) : undefined,
      size: isSet(object.size) ? SizeResponse.fromJSON(object.size) : undefined,
      chunk: isSet(object.chunk)
        ? ChunkResponse.fromJSON(object.chunk)
        : undefined,
      crc32: isSet(object.crc32)
        ? CRC32Response.fromJSON(object.crc32)
        : undefined,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = messageTypeToJSON(message.type));
    message.version !== undefined && (obj.version = message.version);
    message.hash !== undefined && (obj.hash = message.hash);
    message.size !== undefined &&
      (obj.size = message.size ? SizeResponse.toJSON(message.size) : undefined);
    message.chunk !== undefined &&
      (obj.chunk = message.chunk
        ? ChunkResponse.toJSON(message.chunk)
        : undefined);
    message.crc32 !== undefined &&
      (obj.crc32 = message.crc32
        ? CRC32Response.toJSON(message.crc32)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.type = object.type ?? 0;
    message.version = object.version ?? undefined;
    message.hash = object.hash ?? undefined;
    message.size =
      object.size !== undefined && object.size !== null
        ? SizeResponse.fromPartial(object.size)
        : undefined;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? ChunkResponse.fromPartial(object.chunk)
        : undefined;
    message.crc32 =
      object.crc32 !== undefined && object.crc32 !== null
        ? CRC32Response.fromPartial(object.crc32)
        : undefined;
    return message;
  },
};

function createBaseRequest(): Request {
  return {
    type: 0,
    version: undefined,
    hash: undefined,
    chunk: undefined,
    size: undefined,
    crc32: undefined,
  };
}

export const Request = {
  encode(
    message: Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.version !== undefined) {
      VersionRequest.encode(message.version, writer.uint32(18).fork()).ldelim();
    }
    if (message.hash !== undefined) {
      HashRequest.encode(message.hash, writer.uint32(26).fork()).ldelim();
    }
    if (message.chunk !== undefined) {
      ChunkRequest.encode(message.chunk, writer.uint32(34).fork()).ldelim();
    }
    if (message.size !== undefined) {
      SizeRequest.encode(message.size, writer.uint32(42).fork()).ldelim();
    }
    if (message.crc32 !== undefined) {
      ChunkRequest.encode(message.crc32, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.version = VersionRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.hash = HashRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.chunk = ChunkRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.size = SizeRequest.decode(reader, reader.uint32());
          break;
        case 6:
          message.crc32 = ChunkRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
      version: isSet(object.version)
        ? VersionRequest.fromJSON(object.version)
        : undefined,
      hash: isSet(object.hash) ? HashRequest.fromJSON(object.hash) : undefined,
      chunk: isSet(object.chunk)
        ? ChunkRequest.fromJSON(object.chunk)
        : undefined,
      size: isSet(object.size) ? SizeRequest.fromJSON(object.size) : undefined,
      crc32: isSet(object.crc32)
        ? ChunkRequest.fromJSON(object.crc32)
        : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = messageTypeToJSON(message.type));
    message.version !== undefined &&
      (obj.version = message.version
        ? VersionRequest.toJSON(message.version)
        : undefined);
    message.hash !== undefined &&
      (obj.hash = message.hash ? HashRequest.toJSON(message.hash) : undefined);
    message.chunk !== undefined &&
      (obj.chunk = message.chunk
        ? ChunkRequest.toJSON(message.chunk)
        : undefined);
    message.size !== undefined &&
      (obj.size = message.size ? SizeRequest.toJSON(message.size) : undefined);
    message.crc32 !== undefined &&
      (obj.crc32 = message.crc32
        ? ChunkRequest.toJSON(message.crc32)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.type = object.type ?? 0;
    message.version =
      object.version !== undefined && object.version !== null
        ? VersionRequest.fromPartial(object.version)
        : undefined;
    message.hash =
      object.hash !== undefined && object.hash !== null
        ? HashRequest.fromPartial(object.hash)
        : undefined;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? ChunkRequest.fromPartial(object.chunk)
        : undefined;
    message.size =
      object.size !== undefined && object.size !== null
        ? SizeRequest.fromPartial(object.size)
        : undefined;
    message.crc32 =
      object.crc32 !== undefined && object.crc32 !== null
        ? ChunkRequest.fromPartial(object.crc32)
        : undefined;
    return message;
  },
};

function createBaseSizeResponse(): SizeResponse {
  return { fileType: 0, value: 0 };
}

export const SizeResponse = {
  encode(
    message: SizeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fileType !== 0) {
      writer.uint32(8).int32(message.fileType);
    }
    if (message.value !== 0) {
      writer.uint32(16).uint32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SizeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSizeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileType = reader.int32() as any;
          break;
        case 2:
          message.value = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SizeResponse {
    return {
      fileType: isSet(object.fileType) ? fileTypeFromJSON(object.fileType) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: SizeResponse): unknown {
    const obj: any = {};
    message.fileType !== undefined &&
      (obj.fileType = fileTypeToJSON(message.fileType));
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SizeResponse>, I>>(
    object: I
  ): SizeResponse {
    const message = createBaseSizeResponse();
    message.fileType = object.fileType ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseChunkResponse(): ChunkResponse {
  return {
    fileType: 0,
    start: 0,
    length: 0,
    data: new Uint8Array(),
    crc32: undefined,
  };
}

export const ChunkResponse = {
  encode(
    message: ChunkResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fileType !== 0) {
      writer.uint32(8).int32(message.fileType);
    }
    if (message.start !== 0) {
      writer.uint32(16).uint32(message.start);
    }
    if (message.length !== 0) {
      writer.uint32(24).uint32(message.length);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.crc32 !== undefined) {
      writer.uint32(40).uint32(message.crc32);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChunkResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChunkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileType = reader.int32() as any;
          break;
        case 2:
          message.start = reader.uint32();
          break;
        case 3:
          message.length = reader.uint32();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.crc32 = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChunkResponse {
    return {
      fileType: isSet(object.fileType) ? fileTypeFromJSON(object.fileType) : 0,
      start: isSet(object.start) ? Number(object.start) : 0,
      length: isSet(object.length) ? Number(object.length) : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      crc32: isSet(object.crc32) ? Number(object.crc32) : undefined,
    };
  },

  toJSON(message: ChunkResponse): unknown {
    const obj: any = {};
    message.fileType !== undefined &&
      (obj.fileType = fileTypeToJSON(message.fileType));
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.length !== undefined && (obj.length = Math.round(message.length));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.crc32 !== undefined && (obj.crc32 = Math.round(message.crc32));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChunkResponse>, I>>(
    object: I
  ): ChunkResponse {
    const message = createBaseChunkResponse();
    message.fileType = object.fileType ?? 0;
    message.start = object.start ?? 0;
    message.length = object.length ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.crc32 = object.crc32 ?? undefined;
    return message;
  },
};

function createBaseCRC32Response(): CRC32Response {
  return { fileType: 0, start: 0, length: 0, value: 0 };
}

export const CRC32Response = {
  encode(
    message: CRC32Response,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fileType !== 0) {
      writer.uint32(8).int32(message.fileType);
    }
    if (message.start !== 0) {
      writer.uint32(16).uint32(message.start);
    }
    if (message.length !== 0) {
      writer.uint32(24).uint32(message.length);
    }
    if (message.value !== 0) {
      writer.uint32(32).uint32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CRC32Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCRC32Response();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileType = reader.int32() as any;
          break;
        case 2:
          message.start = reader.uint32();
          break;
        case 3:
          message.length = reader.uint32();
          break;
        case 4:
          message.value = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CRC32Response {
    return {
      fileType: isSet(object.fileType) ? fileTypeFromJSON(object.fileType) : 0,
      start: isSet(object.start) ? Number(object.start) : 0,
      length: isSet(object.length) ? Number(object.length) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: CRC32Response): unknown {
    const obj: any = {};
    message.fileType !== undefined &&
      (obj.fileType = fileTypeToJSON(message.fileType));
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.length !== undefined && (obj.length = Math.round(message.length));
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CRC32Response>, I>>(
    object: I
  ): CRC32Response {
    const message = createBaseCRC32Response();
    message.fileType = object.fileType ?? 0;
    message.start = object.start ?? 0;
    message.length = object.length ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseVersionRequest(): VersionRequest {
  return { model: "", hardware: "" };
}

export const VersionRequest = {
  encode(
    message: VersionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.model !== "") {
      writer.uint32(10).string(message.model);
    }
    if (message.hardware !== "") {
      writer.uint32(18).string(message.hardware);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.model = reader.string();
          break;
        case 2:
          message.hardware = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VersionRequest {
    return {
      model: isSet(object.model) ? String(object.model) : "",
      hardware: isSet(object.hardware) ? String(object.hardware) : "",
    };
  },

  toJSON(message: VersionRequest): unknown {
    const obj: any = {};
    message.model !== undefined && (obj.model = message.model);
    message.hardware !== undefined && (obj.hardware = message.hardware);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VersionRequest>, I>>(
    object: I
  ): VersionRequest {
    const message = createBaseVersionRequest();
    message.model = object.model ?? "";
    message.hardware = object.hardware ?? "";
    return message;
  },
};

function createBaseHashRequest(): HashRequest {
  return { model: "", hardware: "", version: "" };
}

export const HashRequest = {
  encode(
    message: HashRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.model !== "") {
      writer.uint32(10).string(message.model);
    }
    if (message.hardware !== "") {
      writer.uint32(18).string(message.hardware);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HashRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.model = reader.string();
          break;
        case 2:
          message.hardware = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HashRequest {
    return {
      model: isSet(object.model) ? String(object.model) : "",
      hardware: isSet(object.hardware) ? String(object.hardware) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: HashRequest): unknown {
    const obj: any = {};
    message.model !== undefined && (obj.model = message.model);
    message.hardware !== undefined && (obj.hardware = message.hardware);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HashRequest>, I>>(
    object: I
  ): HashRequest {
    const message = createBaseHashRequest();
    message.model = object.model ?? "";
    message.hardware = object.hardware ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseChunkRequest(): ChunkRequest {
  return {
    hash: "",
    fileType: 0,
    start: 0,
    length: 0,
    includeCrc32: undefined,
  };
}

export const ChunkRequest = {
  encode(
    message: ChunkRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.fileType !== 0) {
      writer.uint32(16).int32(message.fileType);
    }
    if (message.start !== 0) {
      writer.uint32(24).uint32(message.start);
    }
    if (message.length !== 0) {
      writer.uint32(32).uint32(message.length);
    }
    if (message.includeCrc32 !== undefined) {
      writer.uint32(40).bool(message.includeCrc32);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChunkRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChunkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.fileType = reader.int32() as any;
          break;
        case 3:
          message.start = reader.uint32();
          break;
        case 4:
          message.length = reader.uint32();
          break;
        case 5:
          message.includeCrc32 = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChunkRequest {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
      fileType: isSet(object.fileType) ? fileTypeFromJSON(object.fileType) : 0,
      start: isSet(object.start) ? Number(object.start) : 0,
      length: isSet(object.length) ? Number(object.length) : 0,
      includeCrc32: isSet(object.includeCrc32)
        ? Boolean(object.includeCrc32)
        : undefined,
    };
  },

  toJSON(message: ChunkRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    message.fileType !== undefined &&
      (obj.fileType = fileTypeToJSON(message.fileType));
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.length !== undefined && (obj.length = Math.round(message.length));
    message.includeCrc32 !== undefined &&
      (obj.includeCrc32 = message.includeCrc32);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChunkRequest>, I>>(
    object: I
  ): ChunkRequest {
    const message = createBaseChunkRequest();
    message.hash = object.hash ?? "";
    message.fileType = object.fileType ?? 0;
    message.start = object.start ?? 0;
    message.length = object.length ?? 0;
    message.includeCrc32 = object.includeCrc32 ?? undefined;
    return message;
  },
};

function createBaseSizeRequest(): SizeRequest {
  return { hash: "", fileType: 0 };
}

export const SizeRequest = {
  encode(
    message: SizeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.fileType !== 0) {
      writer.uint32(16).int32(message.fileType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SizeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSizeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.fileType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SizeRequest {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
      fileType: isSet(object.fileType) ? fileTypeFromJSON(object.fileType) : 0,
    };
  },

  toJSON(message: SizeRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    message.fileType !== undefined &&
      (obj.fileType = fileTypeToJSON(message.fileType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SizeRequest>, I>>(
    object: I
  ): SizeRequest {
    const message = createBaseSizeRequest();
    message.hash = object.hash ?? "";
    message.fileType = object.fileType ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
