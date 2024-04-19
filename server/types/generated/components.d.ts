import type { Schema, Attribute } from '@strapi/strapi';

export interface ConfigurationStyle extends Schema.Component {
  collectionName: 'components_configuration_styles';
  info: {
    displayName: 'style';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    radius: Attribute.Decimal;
    circleCount: Attribute.Integer;
    color: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'configuration.style': ConfigurationStyle;
    }
  }
}
