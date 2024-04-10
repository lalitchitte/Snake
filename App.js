import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Constants from './src/Constants';
import Head from './src/Components/Head';
import Food from './src/Components/Food';
import Tail from './src/Components/Tail';
import GameLoop from './src/systems/GameLoop';
import Icon from 'react-native-vector-icons/AntDesign';

const App = () => {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetGame = () => {
    engine.current.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />,
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <GameEngine
        ref={engine}
        style={{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: 'white',
        }}
        entities={{
          head: {
            position: [0, 0],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            renderer: <Head />,
          },
          food: {
            position: [
              randomPositions(0, Constants.GRID_SIZE - 1),
              randomPositions(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />,
          },
        }}
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={e => {
          switch (e) {
            case 'game-over':
              alert('Game over!');
              setIsGameRunning(false);
              return;
          }
        }}
      />

      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity onPress={() => engine.current.dispatch('move-up')}>
            <View style={styles.controlBtn}>
              <Icon name="arrowup" size={30} color={'black'}></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-left')}>
            <View style={styles.controlBtn}>
              <Icon name="arrowleft" size={30} color={'black'}></Icon>
            </View>
          </TouchableOpacity>
          <View style={[styles.controlBtn, {backgroundColor: null}]}>
            {!isGameRunning && (
              <TouchableOpacity onPress={resetGame}>
                <Text
                  style={{
                    color: 'white',
                    padding: 12,
                    textAlign: 'center',
                    fontSize: 20,
                    height: 100,
                    width: 110,
                    backgroundColor: 'grey',
                  }}>
                  Start New Game
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-right')}>
            <View style={styles.controlBtn}>
              <Icon name="arrowright" size={30} color={'black'}></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-down')}>
            <View style={styles.controlBtn}>
              <Icon name="arrowdown" size={30} color={'black'}></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    marginTop: 15,
  },
  controllerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 100,
  },
});

export default App;
