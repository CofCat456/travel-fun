import { h } from 'vue';
import { RouterLink } from 'vue-router';
import type { CollapseProps } from 'naive-ui';
import { NCollapseItem, NIcon } from 'naive-ui';
import { ConfirmationNumberOutlined, FlightTakeoffOutlined } from '@vicons/material';
import { Area, Menu } from './Area';
import router from '@/router/';

const routerlinkClass = 'flex justify-center items-center gap-2';
const packageRouterTo = { name: 'CountryProducts', params: { countryName: 'taiwan', category: 'package' } };
const tourRouterTo = { name: 'Country', params: { countryName: 'taiwan' } };
const favoriteRouterTo = { name: 'WishList' };

export const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({
  name,
}) => {
  if (name === 'package')
    router.push(packageRouterTo);

  else if (name === 'tours')
    router.push(tourRouterTo);

  else
    router.push(favoriteRouterTo);
};

export const navList = [
  {
    id: 'area',
    title: '選地區',
    component: h(Area),
    mobileComponent: h(NCollapseItem,
      {
        name: 'area',
      },
      {
        default: () => h(Menu),
        header: () => h('div',
          {
            class: 'flex-1',
          },
          '選地區',
        ),
      },
    ),
  },
  {
    id: 'package',
    title: '景點套票',
    component: h(RouterLink,
      {
        to: packageRouterTo,
        class: routerlinkClass,
      },
      () => [h(NIcon,
        {
          size: 24,
        },
        () => h(ConfirmationNumberOutlined),
      ),
      '景點套票',
      ],
    ),
    mobileComponent: h(NCollapseItem,
      {
        name: 'package',
      },
      {
        arrow: () => '',
        header: () => h('div',
          {
            class: 'flex-1',
          },
          '景點套票',
        ),
      },
    ),
  },
  {
    id: 'tours',
    title: '觀光行程',
    component: h(RouterLink,
      {
        to: tourRouterTo,
        class: routerlinkClass,
      },
      () => [h(NIcon,
        {
          size: 24,
        },
        () => h(FlightTakeoffOutlined),
      ),
      '觀光行程',
      ],
    ),
    mobileComponent: h(NCollapseItem,
      {
        name: 'tours',
      },
      {
        arrow: () => '',
        header: () => h('div',
          {
            class: 'flex-1',
          },
          '觀光行程',
        ),
      },
    ),
  },
  {
    id: 'favorite',
    title: '我的最愛',
    component: null,
    mobileComponent: h(NCollapseItem,
      {
        name: 'favorite',
      },
      {
        arrow: () => '',
        header: () => h('div',
          {
            class: 'flex-1',
          },
          '我的最愛',
        ),
      },
    ),
  },
];

export default {};
