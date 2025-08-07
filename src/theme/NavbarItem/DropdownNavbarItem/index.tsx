import React, { JSX } from 'react';
import OriginalDropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';
import type {Props} from '@theme/NavbarItem/DropdownNavbarItem';

type CustomItem = {
  label?: string;
  to?: string;
  className?: string;
  customProps?: {
    icon?: string;
    iconAlt?: string;
  };
};

export default function DropdownNavbarItem(props: Props): JSX.Element {
  const enhancedItems = props.items.map((item: any) => {
    const typedItem = item as CustomItem;
    if (typedItem.customProps?.icon && typedItem.label && typedItem.to) {
      const newItem = {
        ...typedItem,
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <img
              src={typedItem.customProps.icon}
              alt={typedItem.customProps.iconAlt || ''}
              style={{ width: '2em', height: '2em' }}
            />
            <span>{typedItem.label}</span>
          </span>
        ),
      };

      delete (newItem as any).customProps;
      return newItem;
    }

    return item;
  });

  return <OriginalDropdownNavbarItem {...props} items={enhancedItems} />;
}
