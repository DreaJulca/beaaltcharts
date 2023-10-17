// src/components/App.tsx
import React, { useState, useReducer, useEffect } from 'react';
import TimeSeriesList from './components/SeriesList';
import ScatterPlotMatrix from './components/SPLOM';
import { fetchData } from './services/beaApi';

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
  // Function to fetch data from the BEA API and update scatterPlotData
  const fetchAndSetData = async (seriesCode: string) => {
    try {
      const response = await fetchData(seriesCode);
      dispatch({ type: 'UPDATE_SCATTER_PLOT', payload: response.data });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    // Fetch data initially or when the selectedTimeSeries changes
    for (const seriesCode of state.selectedTimeSeries) {
      fetchAndSetData(seriesCode);
    }
  }, [state.selectedTimeSeries]);

  return (
    <div className="app">
      <TimeSeriesList
        className="time-series-list" 
        selectedTimeSeries={state.selectedTimeSeries}
        onAddTimeSeries={(seriesCode: string) =>
          dispatch({ type: 'ADD_TIME_SERIES', payload: seriesCode })
        }
        onRemoveTimeSeries={(seriesCode: string) =>
          dispatch({ type: 'REMOVE_TIME_SERIES', payload: seriesCode })
        }
      />
      <ScatterPlotMatrix         
        className="scatter-plot-matrix" 
        data={state.scatterPlotData} />
    </div>
  );
};

export default App;