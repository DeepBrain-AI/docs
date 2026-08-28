import React from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import {useLocation} from '@docusaurus/router';

/**
 * Web SDK v2 페이지에서는 사이트 전체 버전 드롭다운(1.3.x~Latest)을 숨긴다.
 *
 * 이유: v2(aihuman/web-sdk-v2)는 옛 사이트 버전(1.3~1.5)에 대응 문서가 없다. 그래서 v2 페이지에서
 * 옛 버전을 고르면 Docusaurus가 해당 버전의 첫 문서(예: aistudios/getting-started)로 폴백해 무관한
 * 페이지로 튄다. v2는 자체 버전 축이 없으므로 이 컨트롤 자체가 무의미 → v2 경로에서만 렌더하지 않는다.
 * (en/ko 모두 경로에 '/aihuman/web-sdk-v2'를 포함하므로 한 조건으로 처리됨.)
 */
export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const {pathname} = useLocation();
  if (pathname.includes('/aihuman/web-sdk-v2')) {
    return null;
  }
  return <DocsVersionDropdownNavbarItem {...props} />;
}
