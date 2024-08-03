export type CourtInfoType = {
  playerIds: string[];
  matchType: "single" | "double";
  matchStatus: "playing" | "waiting" | "done";
};

// ========== REQUEST & RESPONSE ==========
export type CreateRoomRequest = {
  courtNo: number;
  duration: number;
  courtInfo: CourtInfoType[];
  maxPlayer?: number;
  roomPrivacy?: "private" | "public";
};

export type JoinRoomRequest = {
  roomId: string;
};

export type RoomCreateResponse = RoomType;

// ========== ROOM FUNCTIONS ==========

export type RoomContextFunctions = {
  joinRoom?: (roomId: string) => void;
  createRoom?: (
    courtNo: number,
    duration: number,
    courtInfo: CourtInfoType[],
    maxPlayer?: number,
    roomPrivacy?: "private" | "public"
  ) => void;
};

export type RoomType = {
  id: string;
  roomNo: string;
  qrCodeUrl?: string;
  courtNo: number;
  duration: number;
  courtInfo: CourtInfoType[];
  maxPlayer?: number;
  roomPrivacy?: "private" | "public";
  playerIds: string[];
  error?: any;
} & RoomContextFunctions;
