import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

const getLayerStyles = width => ({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 4000,
  left: 0,
  top: 0,
  flex: 1,
  width: `${width}px`,
  opacity: 0.95,
});

const allowed = postProps => !postProps.scheduled_at && !postProps.pinned;

function getItemStyles(props) {
  const { initialOffset, currentOffset, diffOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { y } = currentOffset;
  const { x } = initialOffset;

  const keepFixed = !allowed(props.item.postProps) &&
                    Math.abs(diffOffset.y) > 50;
  if (keepFixed) {
    y = initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transition: keepFixed ? 'all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
    transform,
    WebkitTransform: transform,
  };
}

class PostDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object, // eslint-disable-line
    initialOffset: PropTypes.shape({ // eslint-disable-line
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({ // eslint-disable-line
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    diffOffset: PropTypes.shape({ // eslint-disable-line
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    if (!this.props.isDragging) {
      return null;
    }

    const { postComponent: PostComponent, postProps } = this.props.item;

    // Dragging any files (images, etc.) onto the app causes `react-dnd`
    // to render this component, so we'll bail out here if it's not a
    // post being dragged.
    if (!PostComponent) {
      return null;
    }

    return (
      <div style={getLayerStyles(this.props.item.width)}>
        <div style={getItemStyles(this.props)}>
          <PostComponent {...postProps} draggable dragging={false} hovering />
        </div>
      </div>
    );
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  diffOffset: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging(),
}))(PostDragLayer);
