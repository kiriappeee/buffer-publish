import React from 'react';
import PropTypes from 'prop-types';
import { NotificationTypes } from '../AppConstants';
import CloseButton from '../components/CloseButton';
import styles from './css/Notification.css';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';

class Notification extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    shouldShowCloseIcon: PropTypes.bool.isRequired,
    className: PropTypes.string,
    classNames: PropTypes.shape({
      notification: PropTypes.string,
      closeButton: PropTypes.string,
    }),
    children: PropTypes.node,
  };

  static defaultProps = {
    className: null,
    classNames: {
      notification: null,
      closeButton: null,
    },
  };

  onCloseButtonClick = () => NotificationActionCreators.removeNotification(this.props.id);

  render() {
    const { type, message, shouldShowCloseIcon, className, classNames, children } = this.props;

    const htmlMessage = { __html: message };

    const notificationClassNamesMap = {
      [NotificationTypes.ERROR]: styles.errorNotification,
      [NotificationTypes.SUCCESS]: styles.successNotification,
      [NotificationTypes.INFO]: styles.infoNotification,
    };

    const notificationClassName = [
      shouldShowCloseIcon ? styles.notificationWithCloseButton : styles.notification,
      notificationClassNamesMap[type],
      classNames.notification || className,
    ].join(' ');

    const closeButtonClassName = [
      'bi bi-x',
      styles.closeButton,
      classNames.closeButton,
    ].join(' ');

    return (
      <div className={notificationClassName}>
        <span dangerouslySetInnerHTML={htmlMessage} />

        {shouldShowCloseIcon &&
          <CloseButton
            onClick={this.onCloseButtonClick}
            className={closeButtonClassName}
          />}

        {children}
      </div>
    );
  }
}

export default Notification;
