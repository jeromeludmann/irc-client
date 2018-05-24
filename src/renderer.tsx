import React from "react";
import { AppRegistry, Text, View } from "react-native";

class App extends React.Component<any, any> {
  public render() {
    return (
      <View>
        <Text>hello</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
