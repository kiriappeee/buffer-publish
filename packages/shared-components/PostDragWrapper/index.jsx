import React, { Component } from 'react';
import PropTypes from 'prop-types';

import flow from 'lodash.flow';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const postSource = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      index: props.index,
      postComponent: props.postComponent,
      postProps: props.postProps,
      width: component.containerNode.offsetWidth,
      onDropPost: props.postProps.onDropPost,
      profileId: props.profileId,
    };
  },
};

const postTarget = {
  drop(props) {
    const { onDropPost } = props.postProps;
    onDropPost({ commit: true });
  },
  canDrop(props, monitor) {
    const draggingPost = monitor.getItem();
    return (!props.postProps.isFixed) && (!draggingPost.postProps.isFixed);
  },
  hover(props, monitor) {
    const { index: dragIndex, onDropPost } = monitor.getItem();
    const { index: hoverIndex } = props;

    // Don't replace post with itself...
    if (dragIndex === hoverIndex) {
      return;
    }

    if (monitor.canDrop()) {
      // Drop!
      onDropPost({ dragIndex, hoverIndex });

      // We need to directly mutate the monitor state here
      // to ensure the currently dragged item index is updated.
      monitor.getItem().index = hoverIndex;
    }
  },
};

class PostDragWrapper extends Component {
  constructor() {
    super();

    this.state = {
      isHovering: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    // The drag layer is <PostDragLayer /> in `queue/components/QueuedPosts`
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  onMouseEnter() {
    this.setState(state => ({ ...state, isHovering: true }));
  }

  onMouseLeave() {
    this.setState(state => ({ ...state, isHovering: false }));
  }

  render() {
    const {
      postComponent: PostComponent,
      postProps,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;

    const { isHovering } = this.state;

    return connectDragSource(
      connectDropTarget(
        <div
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={(node) => { this.containerNode = node; }}
        >
          <PostComponent
            {...postProps}
            draggable
            dragging={isDragging}
            hovering={isHovering}
            fixed={postProps.isFixed}
          />
        </div>,
      ),
    );
  }
}

PostDragWrapper.propTypes = {
  handleDragPost: PropTypes.func, // eslint-disable-line
  profileId: PropTypes.string, // eslint-disable-line
  postComponent: PropTypes.func.isRequired,
  postProps: PropTypes.object.isRequired, // eslint-disable-line
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
  isDragging: PropTypes.bool.isRequired,
};

export default flow(
  DragSource('post', postSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('post', postTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  })),
)(PostDragWrapper);
