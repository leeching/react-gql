import React from 'react';
import {fragment} from '../../../src';

export class OriginPost extends React.Component {
  static defaultProps = {
    post: {
      content: '',
      likes: 0
    }
  };
  likePost(event) {
    event.preventDefault();
    this.props.mutations.like({
      id: this.props.post.id
    });
  }
  render() {
    return (
      <li>
        <span>
          {this.props.post.content}
        </span>
        <button
          type="button"
          onClick={::this.likePost}>
          like
        </button>
        <span>
          {this.props.post.likes}
        </span>
      </li>
    );
  }
}

export const fragmentOpts = {
  fragment: `
    fragment post on Post {
      id, content, likes
    }
  `,
  mutations: {
    like: {
      query: `
        mutation likePost($id: ID) {
          likePost(id: $id) {
            id, content, likes
          }
        }
      `,
      action: 'blogLike',
    }
  }
};

export const Post = fragment(OriginPost, fragmentOpts);
