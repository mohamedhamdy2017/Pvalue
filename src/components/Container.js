import React from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";


export const Container = props => {
  const { container, spinner } = styles;
  const { children, isLoading, style } = props;
  return (
    <View style={[container, style]}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor= 'white'
      />
        <View
          style={
            {
              height: 250 ,
              width: '100%',
              position: "absolute",
              backgroundColor: 'white',
              borderBottomEndRadius: 25,
              borderBottomStartRadius: 25
            }
          }
        />
    
      {isLoading ? (
        <View style={spinner}>
          <ActivityIndicator color={colors.headerBack} size="large" />
        </View>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F4'
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
