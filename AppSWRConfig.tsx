import { useNetInfo } from '@react-native-community/netinfo';
import React, { PropsWithChildren } from 'react'
import { AppState } from 'react-native';
import { SWRConfig } from 'swr';
import NetInfo from "@react-native-community/netinfo";


export const AppSWRConfig: React.FC<PropsWithChildren> = ({children}) => {
  const { isConnected } = useNetInfo();

  const provider = () => new Map();

  const isOnline = () => !!isConnected;

  const isVisible = () => AppState.currentState == 'active';

  const initFocus = (callback: () => any) => {
    let currState = AppState.currentState;

    const subs = AppState.addEventListener('change', newState => {
      if (newState === currState)
        return;
      if (newState === 'active') {
        callback();
      }
      currState = newState;
    });

    return () => subs.remove();
  }

  const initReconnect = (callback: () => any) => {
    let currIsConnected: boolean = !!isConnected;

    const unsubscribe = NetInfo.addEventListener(netState => {
      if (!!netState.isConnected === currIsConnected)
        return;
      callback();
      currIsConnected = !!netState.isConnected;
    });

    return unsubscribe;
  }

  return (
    <SWRConfig value={{
      provider,
      isOnline,
      isVisible,
      initFocus,
      initReconnect,
    }}>
      {children}
    </SWRConfig>
  )
}