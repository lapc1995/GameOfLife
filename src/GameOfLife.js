import React from 'react';
import { Stage, Layer, Rect, Line } from "react-konva";

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            rectangles: [],
            running: false,
            grid: false
        }
        this.map1 = this.generateRandomMap();
        this.map2 = this.generateEmptyMap();
        this.currentMap = 1;
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.runGame = this.runGame.bind(this);
        this.generateEmptyMapAction = this.generateEmptyMapAction.bind(this);
        this.generateRandomMapAction = this.generateRandomMapAction.bind(this);
        this.onClick = this.onClick.bind(this);
        this.showGrid = this.showGrid.bind(this);

        this.grid = this.createGrid();
    }

    createGrid() {
    var lines = [];
        for (var i = 0; i < window.innerWidth; i++) {
            lines.push(<Line
                points={[Math.round(i * 10) + 0.5, 0,  Math.round(i * 10) + 0.5, window.innerHeight]}
                stroke="#ddd"
                strokeWidth={1}
                />);
        }
        for (var j = 0; j < window.innerHeight; j++) {
            lines.push(<Line
                points={[0, Math.round(j * 10),  window.innerWidth, Math.round(j * 10)]}
                stroke="#ddd"
                strokeWidth={0.5}
                />);
        }
        return lines;
    }

    onClick(e) {
        console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        this.setMapPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        
    }

    setMapPosition(x, y) {
        let new_map;
        let new_rectangles = [];
        if(this.currentMap === 1 )  {
            new_map = this.map2;
            this.currentMap = 2;
        } else {
            new_map = this.map1;
            this.currentMap = 1;
        }
        for(var i = 0; i < this.props.y; i++) {
            for(var j = 0; j < this.props.x; j++) {
                if(Math.floor(y/10) === i && Math.floor(x/10) === j){
                    if(this.state.map[i][j] === 0)
                        new_map[i][j] = 1;
                    else
                        new_map[i][j] = 0;
                } else {
                    new_map[i][j] = this.state.map[i][j];
                }
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


    render() {
        var grid = this.state.grid ? this.grid : [];
        return  <div>
                    <div onClick={this.onClick} > <RenderGame game={this.state.rectangles} t={this.onMouseMove} grid={grid}/></div>
                    <div><ControlPanel runGame={this.runGame} 
                                       state={this.state.running?"Pause":"Play"}
                                       empty={this.generateEmptyMapAction}
                                       random={this.generateRandomMapAction}
                                       grid={this.showGrid}/></div>
                </div>
    }

    componentDidMount() {

        var new_rectangles = [];
        for(var i = 0; i < this.props.y; i++) {
            for(var j = 0; j < this.props.x; j++) {
                if(this.map1[i][j] === 1) 
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
            map: this.map1,
            rectangles: new_rectangles
        });

        this.intervalID = setInterval(
            () => this.tick(),
            1/30
        );

        document.addEventListener("keydown", this.onKeyPressed, false);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
        document.removeEventListener("keydown", this.onKeyPressed, false);
    }

    tick() {
        if(this.state.running) {
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
     }

     generateRandomMap() {
        var new_map = new Array(Number(this.props.y));
        for(var i = 0; i < this.props.y; i++) {
            new_map[i] = Array(Number(this.props.x))
            for(var j = 0; j < this.props.x; j++) {
                new_map[i][j] = Math.round(Math.random());
            }
        }
        return new_map;
    }

    generateEmptyMap() {
        var new_map = new Array(Number(this.props.y));
        for(var i = 0; i < this.props.y; i++) {
            new_map[i] = Array(Number(this.props.x))
            for(var j = 0; j < this.props.x; j++) {
                new_map[i][j] = 0;
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

    onKeyPressed(e) {
        if(e.key === ' ')  {
           this.runGame();
        }

    }

    runGame() {
        this.setState({
            running: !this.state.running
        });
    }

    showGrid() {
        this.setState({
            grid: !this.state.grid
        });
    }

    generateRandomMapAction() {
        if(this.currentMap === 1) {
            this.map2 = this.generateRandomMap();
            this.currentMap = 2;
            this.setState({
                map: this.map2
            });
        } else {
            this.map1 = this.generateRandomMap();
            this.currentMap = 1;
            this.setState({
                map: this.map1
            });
        }

        var new_rectangles = [];
        for(var i = 0; i < this.props.y; i++) {
            for(var j = 0; j < this.props.x; j++) {
                if(this.state.map[i][j] === 1) 
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
            rectangles: new_rectangles
        });
    }

    generateEmptyMapAction() {
        if(this.currentMap === 1) {
            this.map2 = this.generateEmptyMap();
            this.currentMap = 2;
            this.setState({
                map: this.map2
            });
        } else {
            this.map1 = this.generateEmptyMap();
            this.currentMap = 1;
            this.setState({
                map: this.map1
            });
        }

        this.setState({
            rectangles: []
        });
    }
}

function ControlPanel(props) {
return  <div>
            <button onClick={props.runGame}> {props.state} </button>
            <button onClick={props.empty}> New Empty Map </button>
            <button onClick={props.random}> New Random Map </button>
            <button onClick={props.grid}> Grid </button>
        </div>



}

function RenderGame(props) {
    return( <div>
                <Stage  width={window.innerWidth} height={window.innerHeight}  >
                    <Layer>
                        {props.game}
                    </Layer>
                    <Layer>
                        {props.grid}
                    </Layer>
                </Stage>
            </div>)
}

export default GameOfLife;