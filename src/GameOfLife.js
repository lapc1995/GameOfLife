import React from 'react';
import { Stage, Layer, Rect } from "react-konva";

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            start: false,
            map_rendering: [],
        }
    }

    render() {
        if(this.state.start) {
            return <div><RenderGame game={this.state.map}/></div>
        }
        return <div></div>

    }

    componentDidMount() {
        this.setState({
            map: this.generateMap(this.randomValue),
            start: true,
        });

        this.intervalID = setInterval(
            () => this.tick(),
            1/30
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            map: this.generateMap(this.gameOfLifeRules)
        });
     }

    generateMap(tile_function) {
        var new_map = new Array(Number(this.props.y));
        for(var i = 0; i < this.props.y; i++) {
            new_map[i] = Array(Number(this.props.x))
            for(var j = 0; j < this.props.x; j++) {
                new_map[i][j] = tile_function(i, j, this);
            }
        }
        return new_map;
    }

    randomValue(i,j,t) {
        return Math.round(Math.random());
    }
     
    gameOfLifeRules(i, j, t) {
        var neighbors = t.getNeighbors(i, j);
        if(t.state.map[i][j] === 1) {
            if(neighbors < 2 || neighbors > 3)
                return 0;
            else if(neighbors === 2 || neighbors === 3)
                return  1;
        } else if (t.state.map[i][j] === 0) {
            if(neighbors === 3)
                return 1;
            else
                return 0;
        } 
    }

    getNeighbors(i, j) {
        var total = 0;

        var up_outofbounds = (i - 1 < 0);
        var down_outofbounds = (i + 1 >= this.props.y);

        var left_outofbounds = (j - 1 < 0);
        var right_outofbounds = (j + 1 >= this.props.x);

        if(!up_outofbounds && !left_outofbounds)
            total += this.state.map[i-1][j-1];

        if(!up_outofbounds)
            total += this.state.map[i-1][j];
   
        if(!up_outofbounds && !right_outofbounds)
            total += this.state.map[i-1][j+1];
      
        if(!left_outofbounds)
            total += this.state.map[i][j-1];

        if(!right_outofbounds)
            total += this.state.map[i][j+1];
    
        if(!down_outofbounds && !left_outofbounds)
            total += this.state.map[i+1][j-1];
      
        if(!down_outofbounds)
            total += this.state.map[i+1][j];
      
        if(!down_outofbounds && !right_outofbounds)
            total += this.state.map[i+1][j+1];
    
        return total
    }
}

function RenderGame(props) {
    var rectangles = []
    for(var i = 0; i < props.game.length; i++) { 
        for(var j = 0; j < props.game[i].length; j++) { 
            var color = props.game[i][j] === 0 ? "rgb(255,255,255)" : "rgb(0,0,0)";
            rectangles.push(
                <Rect
                    x={j * 10}
                    y={i * 10}
                    width={10}
                    height={10}
                    fill={color}
                />
            );
        }
    }
  
    return(<Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {rectangles}
                </Layer>
            </Stage>)
}

export default GameOfLife;