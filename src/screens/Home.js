import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../service/data.json';
import {Container} from '../components/Container';
import {strings} from '../strings/index.js';
import {images} from '../assets/index.js';

export class Home extends Component {
  state = {
    selectedHeadDataID: 0,
  };

  render() {
    const {selectedHeadDataID} = this.state;
    const {
      plusIconContainer,
      logoContainerStyle,
      headContainer,
      boardsTextStyle,
      searchContainerStyle,
      selectionDotStyle,
      cardContainerStyle,
      cardNameStyle,
      membersTextStyle,
      accountNameContainer,
      accountNameStyle,
      logoStyle,
      addPlusStyle,
      searchInputStyle,
      headListStyle,
      teamsSectionContainer,
      teamsTextStyle,
    } = styles;
    return (
      <Container>
        <View style={headContainer}>
          <TouchableOpacity style={plusIconContainer}>
            <Text style={addPlusStyle}>+</Text>
          </TouchableOpacity>

          <View style={logoContainerStyle}>
            <Image source={images.logo} style={{width: 50, height: 50}} />
          </View>
        </View>

        <Text style={boardsTextStyle}>{strings.appHeadText}</Text>
        <View style={searchContainerStyle}>
          <Icon name="search" size={16} color={'gray'} />
          <TextInput
            style={searchInputStyle}
            placeholderTextColor="gray"
            placeholder="Search cards..."
          />
        </View>
        {/* head section list */}
        <View style={{height: 80}}>
          <FlatList
            data={headData}
            contentContainerStyle={headListStyle}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              const {title} = item;
              const isSelected = index == selectedHeadDataID;
              return (
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.setState({selectedHeadDataID: index})}>
                  <Text
                    style={
                      ({color: 'black'}, isSelected && {color: '#628eea'})
                    }>
                    {title}
                  </Text>
                  {isSelected && <View style={selectionDotStyle} />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {selectedHeadDataID == 0 && (
          <FlatList
            data={data.accounts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={accountNameContainer}>
                    <Image source={{uri: item.logo}} style={logoStyle} />
                    <Text style={accountNameStyle}>{item.account_name}</Text>
                  </View>
                  <FlatList
                    data={item.boards}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      const accountName = data.accounts.map(name => {
                        return name.account_name;
                      });
                      return (
                        <TouchableOpacity
                          style={cardContainerStyle}
                          onPress={() => {
                            this.props.navigation.navigate('ItemDetails', {
                              item,
                              accountName,
                            });
                          }}>
                          <Text style={cardNameStyle}>{item.board_name}</Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={membersTextStyle}>
                              {item.tasks[0].state
                                ? item.tasks[0].state[0].comments &&
                                  item.tasks[0].state[0].comments.length
                                : 0}{' '}
                              {strings.members}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        )}

        {selectedHeadDataID == 1 && (
          <View style={teamsSectionContainer}>
            <Text style={teamsTextStyle}>{strings.teamsSection}</Text>
          </View>
        )}

        {selectedHeadDataID == 2 && (
          <View style={teamsSectionContainer}>
            <Text style={teamsTextStyle}>{strings.personalSection}</Text>
          </View>
        )}
      </Container>
    );
  }
}

const headData = [{title: 'All Boards'}, {title: 'Teams'}, {title: 'Personal'}];

const styles = StyleSheet.create({
  plusIconContainer: {
    backgroundColor: '#7a9ce3',
    width: 38,
    height: 38,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    end: 25,
  },
  addPlusStyle: {
    fontSize: 25,
    color: 'white',
  },
  searchInputStyle: {
    marginStart: 15,
    height: 40,
    width: '90%',
  },
  logoContainerStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    start: 25,
  },
  headContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  headListStyle: {
    width: '100%',
    marginTop: 25,
    justifyContent: 'space-around',
  },
  boardsTextStyle: {
    fontSize: 35,
    fontWeight: '600',
    marginTop: 30,
    marginStart: 25,
  },
  searchContainerStyle: {
    flexDirection: 'row',
    width: '80%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#d2d4d6',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  iconContainerStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  selectionDotStyle: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#628eea',
    marginTop: 5,
  },
  cardContainerStyle: {
    width: 320,
    height: 100,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
  },
  cardNameStyle: {
    color: 'black',
    fontSize: 16,
    marginTop: 20,
    marginStart: 20,
  },
  membersTextStyle: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
    marginStart: 16,
    marginTop: 8,
  },
  accountNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 30,
  },
  accountNameStyle: {
    fontSize: 16,
    fontWeight: '600',
    marginStart: 15,
    marginVertical: 15,
  },
  logoStyle: {
    width: 15,
    height: 15,
  },
  teamsSectionContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  teamsTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
