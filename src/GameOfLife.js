import React from 'react';
import { Stage, Layer, Rect } from "react-konva";

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            rectangles: []
        }
        this.map1 = this.generateMap();
        this.map2 = this.generateMap();
        this.currentMap = 1;
    }

    render() {
        return <div><RenderGame game={this.state.rectangles}/></div>
    }

    componentDidMount() {
        this.setState({
            map: this.map1,
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
        var new_rectangles = [];
        let new_map;
        if(this.currentMap === 1 )  {
            new_map = this.map2;
            this.currentMap = 2;
        } else {
            new_map = this.map1;
            this.currentMap = 1;
        }
        for(var i = 0; i < this.props.y; i++) {
            for(var j = 0; j < this.props.x; j++) {
                new_map[i][j] = this.gameOfLifeRules(i, j, this);
                if(new_map[i][j] === 1) 
                    new_rectangles.push(
                        <Rect
                            x={j * 10}
                            y={i * 10}
                            width={10}
                            height={10}
                            fill={"rgb(0,0,0)"}
                        />
                    );
            }
        }
        this.setState({
            map: new_map,
            rectangles: new_rectangles
        });
     }

     generateMap() {
        var new_map = new Array(Number(this.props.y));
        for(var i = 0; i < this.props.y; i++) {
            new_map[i] = Array(Number(this.props.x))
            for(var j = 0; j < this.props.x; j++) {
                new_map[i][j] = Math.round(Math.random());
            }
        }
        return new_map;
    }

    gameOfLifeRules(i, j) {
        var neighbors = this.getNeighbors(i, j);
        if(this.state.map[i][j] === 1) {
            if(neighbors < 2 || neighbors > 3)
                return 0;
            else if(neighbors === 2 || neighbors === 3)
                return  1;
        } else if (this.state.map[i][j] === 0) {
            if(neighbors === 3)
                return 1;
            else
                return 0;
        } 
    }

    getNeighbors(i, j) {
        var total = 0;

        var up = (i - 1 < 0 ? this.props.y-1 : i - 1);
        var down = (i + 1 >= this.props.y ? 0 : i + 1);
        var left = (j - 1 < 0 ? this.props.x-1 : j - 1);
        var right = (j + 1 >= this.props.x ? 0 : j + 1);

       total += this.state.map[up][left];
       total += this.state.map[up][j];
       total += this.state.map[up][right];
       total += this.state.map[i][left];
       total += this.state.map[i][right];
       total += this.state.map[down][left];
       total += this.state.map[down][j];
       total += this.state.map[down][right];
  
        return total
    }
}

function RenderGame(props) {
    return(<Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {props.game}
                </Layer>
            </Stage>)
}

export default GameOfLife;