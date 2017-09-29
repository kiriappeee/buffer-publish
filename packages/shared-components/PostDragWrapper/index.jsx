import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
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
      onDropPost: props.onDropPost,
      profileId: props.profileId,
    };
  },
};

const postTarget = {
  hover(props, monitor, hoverComponent) {
    const { index: dragIndex, postProps: dragPost } = monitor.getItem();
    const { index: hoverIndex, postProps: hoverPost } = props;

    // Don't replace post with itself
    if (dragIndex === hoverIndex) {
      return;
    }

    console.log(`Dragging ${dragIndex} over ${hoverIndex}.`);

    const hoverRect = findDOMNode(hoverComponent).getBoundingClientRect(); // eslint-disable-line
    const topThirdOfHover = ((hoverRect.bottom - hoverRect.top) / 3) + hoverRect.top;
    const bottomThirdOfHover = hoverRect.bottom - ((hoverRect.bottom - hoverRect.top) / 3);

    const mouse = monitor.getClientOffset();

    // Dragging downwards
    if (dragIndex < hoverIndex && mouse.y < topThirdOfHover) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && mouse.y > bottomThirdOfHover) {
      return;
    }

    // Drop!
    props.postProps.onDropPost({ draggedPost: dragPost, droppedOnPost: hoverPost });

    // https://github.com/react-dnd/react-dnd/blob/abbe4c7d715c3be99a50885280b677f5c232d1a4/examples/04%20Sortable/Simple/Card.js#L67
    monitor.getItem().index = hoverIndex;
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
          <PostComponent {...postProps} draggable dragging={isDragging} hovering={isHovering} />
        </div>,
      ),
    );
  }
}

PostDragWrapper.propTypes = {
  handleDragPost: PropTypes.func.isRequired, // eslint-disable-line
  profileId: PropTypes.string.isRequired, // eslint-disable-line
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
  DropTarget('post', postTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
)(PostDragWrapper);
