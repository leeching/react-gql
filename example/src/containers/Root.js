import React from 'react';
import Gql from '../react-gql';

import List from '../components/List';
import User from '../components/User';

@Gql.Root({
  getState: state => ({
    user: state.blog.user,
    posts: state.blog.posts,
  }),
  init: {
    query: `
      query ($type: String) {
        user {
          ${User.getFragment()}
        }
        posts (type: $type) {
          ${List.getFragment()}
        }
      }
    `,
    action: [
      actions => actions.blog.userInfo,
      actions => actions.blog.init
    ],
    variables: {
      type: 'economy'
    }
  },
})
export default class Root extends React.Component {
  render() {
    const {posts, user} = this.props;
    return (
      <div>
        <List posts={posts} />
        <User user={user} />
      </div>
    );
  }
}
