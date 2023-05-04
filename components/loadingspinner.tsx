import { usePromiseTracker } from "react-promise-tracker";
import React, { Component } from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export const LoadingComponent = () => {
    const { promiseInProgress } = usePromiseTracker();
    
      return (
          (promiseInProgress === true) ?
          <DotIndicator color='darkblue' /> : null)
    };