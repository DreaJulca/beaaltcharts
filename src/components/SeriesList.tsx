// src/components/TimeSeriesList.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface TimeSeriesListProps {
    selectedTimeSeries: string[]; // Define the type for selectedTimeSeries
    onAddTimeSeries: (seriesCode: string) => void;
    onRemoveTimeSeries: (seriesCode: string) => void;
    className?: string; // Define the className prop    
  }

const TimeSeriesItem: React.FC<{ seriesCode: string }> = ({ seriesCode }) => {
  const [, ref] = useDrag({
    type: 'TIME_SERIES', // Specify a unique type for your draggable item
    item: { seriesCode },
  });

  return (
    <div ref={ref} className="time-series-item">
      {seriesCode}
    </div>
  );
};


const TimeSeriesList: React.FC<TimeSeriesListProps> = (props) => {
    // Define your list of time series, e.g., from an API
  const timeSeriesList: string[] = ['Series 1', 'Series 2', 'Series 3'];

  return (
    <div>
      <h2>Time Series List</h2>
      <div className="time-series-list">
        {timeSeriesList.map((seriesCode) => (
          <TimeSeriesItem key={seriesCode} seriesCode={seriesCode} />
        ))}
      </div>
    </div>
  );
};

export default TimeSeriesList;