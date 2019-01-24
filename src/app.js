import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import 'stylesheets/app.css';

class App extends Component {
  state = {
    tilesUsed: [],
  };

  tileTotals = {
    city1: { tileKey: 'city1', count: 5 },
    city11ne: { tileKey: 'city11ne', count: 2 },
    city11we: { tileKey: 'city11we', count: 3 },
    city1rse: { tileKey: 'city1rse', count: 3 },
    city1rsw: { tileKey: 'city1rsw', count: 3 },
    city1rswe: { tileKey: 'city1rswe', count: 3 },
    city1rwe: { tileKey: 'city1rwe', count: 4 },
    city2nw: { tileKey: 'city2nw', count: 3 },
    city2nwr: { tileKey: 'city2nwr', count: 3 },
    city2nws: { tileKey: 'city2nws', count: 2 },
    city2nwsr: { tileKey: 'city2nwsr', count: 2 },
    city2we: { tileKey: 'city2we', count: 1 },
    city2wes: { tileKey: 'city2wes', count: 2 },
    city3: { tileKey: 'city3', count: 3 },
    city3r: { tileKey: 'city3r', count: 1 },
    city3s: { tileKey: 'city3s', count: 1 },
    city3sr: { tileKey: 'city3sr', count: 2 },
    city4: { tileKey: 'city4', count: 1 },
    cloister: { tileKey: 'cloister', count: 4 },
    cloisterr: { tileKey: 'cloisterr', count: 2 },
    road2ns: { tileKey: 'road2ns', count: 9 },
    road2sw: { tileKey: 'road2sw', count: 2 },
    road3: { tileKey: 'road3', count: 4 },
    road4: { tileKey: 'road4', count: 1 },
  };

  tileCountsRemaining = () => {
    const currentTileCounts = _.cloneDeep(this.tileTotals);
    _.each(this.state.tilesUsed, tileKey => {
      currentTileCounts[tileKey].count -= 1;
    });
    return currentTileCounts;
  };

  setTileUsed = tileKey => {
    const newTilesUsed = [...this.state.tilesUsed, tileKey];
    this.setState({ tilesUsed: newTilesUsed });
  };

  render() {
    const numTilesTotal = _.sumBy(_.values(this.tileTotals), 'count');
    const numTilesUsed = this.state.tilesUsed.length;
    const numTilesRemaining = numTilesTotal - numTilesUsed;
    const tileCountsRemaining = this.tileCountsRemaining();
    const tileTypeRows = _.map(
      _.values(this.tileTotals),
      ({ tileKey, count }) => {
        const remaining = tileCountsRemaining[tileKey].count;
        return (
          <TileCount
            tileKey={tileKey}
            remaining={remaining}
            total={count}
            setTileUsedFunc={this.setTileUsed}
            key={tileKey}
          />
        );
      }
    );
    const tileUsedCells = _.map(this.state.tilesUsed, tileKey => {
      return <TileUsed tileKey={tileKey} key={tileKey} />;
    });
    return (
      <div className="app">
        <h1>Tiles Remaining ({numTilesRemaining})</h1>
        <div className="tile-counts-container">{tileTypeRows}</div>
        <h1>Tiles Used ({numTilesUsed})</h1>
        <div className="tiles-used-container">{tileUsedCells}</div>
      </div>
    );
  }
}

export default App;

class TileCount extends Component {
  render() {
    const tileImg = require(`assets/images/${this.props.tileKey}.png`);
    const noneLeft = this.props.remaining <= 0;
    const clickFunc = () => {
      if (!noneLeft) {
        this.props.setTileUsedFunc(this.props.tileKey);
      }
    };
    const tilePicClasses = classNames('tile-count-pic', {
      disabled: noneLeft,
    });
    const tileCountRemainingClasses = classNames('tile-count-remaining', {
      red: noneLeft,
    });
    return (
      <div className="tile-count">
        <img
          className={tilePicClasses}
          src={tileImg}
          alt={this.props.tileKey}
          onClick={clickFunc}
        />
        <div className="tile-count-nums">
          <div className={tileCountRemainingClasses}>
            {this.props.remaining}
          </div>
          / {this.props.total}
        </div>
      </div>
    );
  }
}

class TileUsed extends Component {
  render() {
    const tileImg = require(`assets/images/${this.props.tileKey}.png`);
    return (
      <div className="tile-used">
        <img className="tile-used-pic" src={tileImg} alt={this.props.tileKey} />
      </div>
    );
  }
}
