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

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { y } = currentOffset;
  const { x } = initialOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
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
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    if (!this.props.isDragging) {
      return null;
    }

    const { postComponent: PostComponent, postProps } = this.props.item;

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
  isDragging: monitor.isDragging(),
}))(PostDragLayer);
