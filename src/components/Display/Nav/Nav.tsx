import { ReactNode, useRef, useState } from 'react'
import { IoOptionsOutline, IoClose } from "react-icons/io5";

import { navBar, navComponentContainer, subNavContainer } from './model/classnames'
import { useWindowDimensions } from '../../functions';
import { useMutation } from '@apollo/client';
import { UPDATE_CONTENT } from '../../apollo/model/mutations';
import { client } from '../../..';
import { GET_CONTENT } from '../../apollo/model/queries';
import ContentController from '../../apollo/controller/controller';

export default function Nav() {
  const [subVisible, setSubVisible] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const navRef = useRef<HTMLDivElement>(null);

  const { changeContent } = ContentController();

  const changeView = async (current: string) => {
    changeContent( current )
  }

  const rightSide: ReactNode =
    <>
      <div className={navComponentContainer} onClick={() => changeView("History")}>
        History
      </div>
    </>

  return (
    <>
      <nav className={navBar} ref={navRef}>
        <div className={navComponentContainer} onClick={() => changeView("Home")}>
            Tochy Egeonu
        </div>
        {
          (width < 1024)
            ?
            <>
              <div className={`h-auto visible cursor-pointer mt-2 ${navComponentContainer}`} onClick={() => setSubVisible(!subVisible)}>
                {
                  subVisible
                    ?
                    <IoClose size={25} />
                    :
                    <IoOptionsOutline size={25} />
                }
              </div>
              {
                (subVisible)
                &&
                <div className={subNavContainer}>
                  {rightSide}
                </div>
              }
            </>

            :
            <div className={'flex'}>
              {rightSide}
            </div>

        }
      </nav>
    </>
  );
}