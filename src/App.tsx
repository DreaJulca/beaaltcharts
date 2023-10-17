// src/components/App.tsx
import React, { useState, useReducer } from 'react';
import TimeSeriesList from './components/SeriesList';
import ScatterPlotMatrix from './components/SPLOM';

// Define the shape of the state
interface AppState {
  selectedTimeSeries: string[];
  scatterPlotData: any[]; // Adjust the data structure as needed
}

// Actions to update the state
type AppAction =
  | { type: 'ADD_TIME_SERIES'; payload: string }
  | { type: 'REMOVE_TIME_SERIES'; payload: string }
  | { type: 'UPDATE_SCATTER_PLOT'; payload: any[] };

const initialState: AppState = {
  selectedTimeSeries: [],
  scatterPlotData: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TIME_SERIES':
      return {
        ...state,
        selectedTimeSeries: [...state.selectedTimeSeries, action.payload],
      };
    case 'REMOVE_TIME_SERIES':
      return {
        ...state,
        selectedTimeSeries: state.selectedTimeSeries.filter(
          (series) => series !== action.payload
        ),
      };
    case 'UPDATE_SCATTER_PLOT':
      return {
        ...state,
        scatterPlotData: action.payload,
      };
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="app">
      <TimeSeriesList
        selectedTimeSeries={state.selectedTimeSeries}
        onAddTimeSeries={(seriesCode: string) =>
          dispatch({ type: 'ADD_TIME_SERIES', payload: seriesCode })
        }
        onRemoveTimeSeries={(seriesCode: string) =>
          dispatch({ type: 'REMOVE_TIME_SERIES', payload: seriesCode })
        }
      />
      <ScatterPlotMatrix data={state.scatterPlotData} />
    </div>
  );
};

export default App;