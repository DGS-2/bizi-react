import axios from "axios"
import socketIOClient from "socket.io-client"
import { CONNECTION_ESTABLISHED } from "./types"


export const establishConnection = ()  => {
  const socket = socketIOClient(`http://127.0.0.1:5000`)
  return socket.connected 
}