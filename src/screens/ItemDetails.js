import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Container} from '../components/Container';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCard} from '../redux/actions';
import {strings} from '../strings';

class ItemDetails extends Component {
  onSwipe(cardExist, item) {
    if (cardExist) {
      this.props.deleteCard(item.id);
    }
  }
  render() {
    const item = this.props.navigation.state.params.item;

    const accountName = this.props.navigation.getParam('accountName');

    const {board_name, members} = item;

    const photos = members.slice(0, 3);

    const numOfMembers = members.length - photos.length - 1;

    const {
      headContainer,
      headIconsContainer,
      headIconContainer,
      headTextStyle,
      membersImageContainer,
      search_container,
      searchContainerStyle,
      searchInputStyle,
      searchButton,
      membersCountTextStyle,
      cardContainerStyle,
      membersContainer,
      imageContainer,
      stateContainerStyle,
      stateTextStyle,
      sideCardBorder,
      headArrowsContainer,
      leftRightIconsContainer,
      headListContainer,
      headButtonsContainer,
      plusIconContainer,
    } = styles;

    const {items} = this.props;

    return (
      <Container>
        <View style={headContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="angle-left" size={25} />
          </TouchableOpacity>
          <Text style={headTextStyle}>{accountName}</Text>
          <View style={headIconsContainer}>
            <TouchableOpacity style={headIconContainer}>
              <Icon name="ellipsis-h" size={18} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={headIconContainer}>
              <Icon name="bell" size={14} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[headTextStyle, {fontSize: 30}]}>{board_name}</Text>

        <View style={membersImageContainer}>
          <View style={membersContainer}>
            {photos.map((photo, index) => {
              return (
                <View style={imageContainer}>
                  <Image
                    key={index}
                    source={{uri: photo.photo}}
                    style={[imageContainer, {resizeMode: 'cover'}]}
                  />
                </View>
              );
            })}

            <Text style={membersCountTextStyle}>
              +{numOfMembers} {strings.people}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={{color: '#37A7CB'}}>{strings.sendInvite}</Text>
          </TouchableOpacity>
        </View>
        <View style={search_container}>
          <View style={searchContainerStyle}>
            <Icon name="search" size={16} color={'gray'} />
            <TextInput
              style={searchInputStyle}
              placeholderTextColor="gray"
              placeholder="Search cards..."
            />
          </View>
          <TouchableOpacity style={searchButton}>
            <Icon name="search" size={16} color={'#37A7CB'} />
          </TouchableOpacity>
          <View style={headArrowsContainer}>
            <TouchableOpacity style={leftRightIconsContainer}>
              <Icon name="caret-left" size={18} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={leftRightIconsContainer}>
              <Icon name="caret-right" size={18} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={item.tasks}
          style={{marginTop: 35, width: 320}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View>
                <View style={headListContainer}>
                  <View style={stateContainerStyle}>
                    <Text style={stateTextStyle}>{item.state[0].type}</Text>
                  </View>

                  <View style={headButtonsContainer}>
                    <TouchableOpacity
                      style={[plusIconContainer, {marginEnd: 10}]}>
                      <Icon name="plus" size={14} color={'#37A7CB'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={plusIconContainer}>
                      <Icon name="ellipsis-v" size={14} color={'#37A7CB'} />
                    </TouchableOpacity>
                  </View>
                </View>

                <FlatList
                  data={items}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    const cardExist = items.includes(item);
                    return (
                      <ScrollView
                        key={index}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        onScrollEndDrag={() => this.onSwipe(cardExist, item)}>
                        <View style={cardContainerStyle}>
                          <View style={sideCardBorder} />
                          <Text style={styles.taskTitleStyle}>
                            {item.task_title}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.commentsTextStyle}>
                              {item.comments.length} {strings.comments}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: 30,
                                marginEnd: 15,
                              }}>
                              <Icon
                                name="paperclip"
                                size={13}
                                color={'gray'}
                                style={{transform: [{rotateY: '180deg'}]}}
                              />
                              <Text style={{color: 'gray'}}>
                                {item.attachment}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headContainer: {
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    justifyContent: 'space-between',
  },
  headIconContainer: {
    width: 25,
    height: 25,
    backgroundColor: '#068DE4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  headTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart: 15,
  },
  membersImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  search_container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  searchContainerStyle: {
    flexDirection: 'row',
    width: '65%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#F7F5F4',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInputStyle: {
    marginStart: 15,
    height: 40,
    width: '90%',
  },
  searchButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F7F5F4',
  },
  headArrowsContainer: {
    flexDirection: 'row',
    backgroundColor: '#068DE4',
    width: 45,
    height: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  leftRightIconsContainer: {
    width: 20,
    height: 20,
    backgroundColor: '#068DE4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  cardContainerStyle: {
    width: 290,
    height: 80,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    marginStart: 15,
    justifyContent: 'center',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 10,
  },
  membersCountTextStyle: {
    fontSize: 14,
    fontWeight: '600',
  },
  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 1,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  stateContainerStyle: {
    backgroundColor: '#EF4CA7',
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginStart: 15,
    // marginTop: 15,
  },
  stateTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  taskTitleStyle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginStart: 20,
    marginTop: 8,
  },
  commentsTextStyle: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
    marginStart: 20,
    marginTop: 8,
  },
  commentShareContainer: {
    flexDirection: 'row',
  },
  sideCardBorder: {
    width: 3,
    height: 12,
    backgroundColor: '#EF4CA7',
    position: 'absolute',
    marginTop: 20,
    marginStart: -2,
  },
  headListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headButtonsContainer: {
    width: 50,
    height: 20,
    marginEnd: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  plusIconContainer: {
    backgroundColor: '#D3DADE',
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({cardReducer}) => {
  const {items} = cardReducer;
  return {items};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteCard,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
