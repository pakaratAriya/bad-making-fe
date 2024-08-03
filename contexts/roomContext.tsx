import { createContext, PropsWithChildren, useState } from "react";
import uuid from "react-native-uuid";
import {
  CourtInfoType,
  CreateRoomRequest,
  JoinRoomRequest,
  RoomType,
} from "./types/room";

import { useContext } from "react";
import { AuthContext } from "./authContext";

const initialRoomValue: RoomType = {
  id: "init_id",
  roomNo: "0000",
  playerIds: [],
  courtInfo: [{ matchStatus: "waiting", playerIds: [], matchType: "single" }],
  courtNo: 1,
  duration: 7200,
};

const RoomContext = createContext<RoomType>(initialRoomValue);

export function RoomContextProvider({ children }: PropsWithChildren) {
  const { token } = useContext(AuthContext);
  const [roomState, setRoomState] = useState<RoomType>(initialRoomValue);

  const fetchRoomApi = async (url: string, body: any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      const data: RoomType = result.data;
      setRoomState(data);
      setRoomState((prevState) => ({
        ...prevState,
        error: null,
      }));
    } catch (e) {
      console.error(e);
      setRoomState((prevState) => ({
        ...prevState,
        error: e,
      }));
    }
  };

  const createRoomFn = async (
    courtNo: number,
    duration: number,
    courtInfo: CourtInfoType[],
    maxPlayer?: number,
    roomPrivacy?: "private" | "public"
  ) => {
    const createRoomRequest: CreateRoomRequest = {
      courtNo: courtNo,
      duration: duration,
      courtInfo: courtInfo,
      maxPlayer: maxPlayer,
      roomPrivacy: roomPrivacy,
    };

    if (process.env.EXPO_PUBLIC_ENV === "MOCK") {
      console.log(`newRoom: ${createRoomRequest}`);
      return;
    }
    const url = "";
    fetchRoomApi(url, createRoomRequest);
  };

  const joinRoomFn = async (roomId: string) => {
    const joinRoomRequest: JoinRoomRequest = {
      roomId: roomId,
    };
    if (process.env.EXPO_PUBLIC_ENV === "MOCK") {
      return;
    }
    const url = "";
    fetchRoomApi(url, joinRoomRequest);
  };

  return (
    <RoomContext.Provider
      value={{
        ...roomState,
        createRoom: createRoomFn,
        joinRoom: joinRoomFn,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
