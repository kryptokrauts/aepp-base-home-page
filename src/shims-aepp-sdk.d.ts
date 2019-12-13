declare module '@aeternity/aepp-sdk/es/rpc/client' {
  interface Stamp {
    compose: (options: any) => Stamp,
    (): Promise<any>,
  }
  const stamp: Stamp;
  export default stamp;
}
