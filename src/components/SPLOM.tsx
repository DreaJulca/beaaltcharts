// src/components/SPLOM.tsx
import React from 'react';
import { VegaLite } from 'react-vega';

interface ScatterPlotMatrixProps {
    data: any[]; // Define the type for data
    className?: string; // Define the className prop
  }

const scatterplotSpecification =
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "mark": "point",
  "encoding": {
    "x": {"field": "xField", "type": "quantitative"},
    "y": {"field": "yField", "type": "quantitative"}
  }
}


const ScatterPlotMatrix: React.FC<ScatterPlotMatrixProps> = ({ data }) => {
    // Implement a scatter plot matrix
    return (
        <div className="scatter-plot-matrix">
          <h2>Scatter Plot Matrix</h2>
          <div className="scatter-plots">
            {data.map((dataPoint, index) => (
              <div key={index} className="scatter-plot">
                <VegaLite
                  spec={scatterplotSpecification}
                  data={{ values: dataPoint }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    
};

export default ScatterPlotMatrix;