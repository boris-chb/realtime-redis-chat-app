import { SidebarOption } from '@/app/layout';
import { FC } from 'react';
import MenuLink from './MenuLink';

interface MenuListProps {
  title: string;
  options: SidebarOption[];
}

const MenuList: FC<MenuListProps> = ({ title, options }) => {
  return (
    <>
      <div className='font-semibold leading-6 text-gray-600 text-s'>
        {title}
      </div>
      <ul role='list' className='mt-2 -mx-2 space-y-1'>
        {options.map(({ id, href, title }) => (
          <li key={id}>
            <MenuLink href={href} title={title} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuList;
