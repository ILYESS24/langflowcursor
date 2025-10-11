declare module "socket.io-client" {
  export interface Socket {
    connect(): Socket;
    disconnect(): Socket;
    emit(event: string, ...args: any[]): Socket;
    on(event: string, listener: (...args: any[]) => void): Socket;
    off(event: string, listener?: (...args: any[]) => void): Socket;
    close(): Socket;
  }

  export function io(url?: string, options?: any): Socket;
}
