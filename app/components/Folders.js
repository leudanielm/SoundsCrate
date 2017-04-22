/* @flow */
import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { getCollectionFolders } from '../discogs';
import LoadingIndicator from './LoadingIndicator';

type State = {
  folders: [],
};

export default class Folders extends Component {
  state: State = { folders: [] }

  componentWillMount() {
    this.getFolders();
  }

  render() {
    const { folders } = this.state;
    const isLoading = !Boolean(folders.length);
    const contentContainerStyle = styles[isLoading ? 'root' : 'noFlex'];
    return (
      <ScrollView style={styles.root} contentContainerStyle={contentContainerStyle}>
        {isLoading && <LoadingIndicator/>}
        {!isLoading && folders.map((folder, index) => (
          <TouchableHighlight
            key={index}
            style={styles.folder}
            underlayColor={'#ccc'}
            onPress={() => this.openFolder(folder.id)}>
            <Text style={styles.folderText}>{folder.name}</Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
    )
  }

  openFolder(id: number) {
    const { navigate } = this.props.navigation;
    navigate('Folder', { id });
  }

  async getFolders() {
    const folders = await getCollectionFolders();
    this.setState({ folders });
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noFlex: {
    flex: 0,
  },
  folder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#eee',
  },
  folderText: {
    fontSize: 16,
  },
});
