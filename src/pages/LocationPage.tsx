import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

interface Props extends WithTranslation {}

class LocationPage extends React.Component<Props> {}

export default withTranslation('location-page')(LocationPage);
