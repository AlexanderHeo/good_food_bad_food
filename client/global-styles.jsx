import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	html {
		--primary-0: #E3F9E5;
		--primary-1: #C1EAC5;
		--primary-2: #A3D9A5;
		--primary-3: #7BC47F;
		--primary-4: #57AE5B;
		--primary-5: #3F9142;
		--primary-6: #2F8132;
		--primary-7: #207227;
		--primary-8: #0E5814;
		--primary-9: #05400A;

		--gray-0: #F7F7F7;
		--gray-1: #E1E1E1;
		--gray-2: #CFCFCF;
		--gray-3: #B1B1B1;
		--gray-4: #9E9E9E;
		--gray-5: #7E7E7E;
		--gray-6: #626262;
		--gray-7: #515151;
		--gray-8: #3B3B3B;
		--gray-9: #222222;

		--secondary-0: #EAE2F8;
		--secondary-1: #CFBCF2;
		--secondary-2: #A081D9;
		--secondary-3: #8662C7;
		--secondary-4: #724BB7;
		--secondary-5: #653CAD;
		--secondary-6: #51279B;
		--secondary-7: #421987;
		--secondary-8: #34126F;
		--secondary-9: #240754;

		--warning-0: #FFEEEE;
		--warning-1: #FACDCD;
		--warning-2: #F29B9B;
		--warning-3: #E66A6A;
		--warning-4: #D64545;
		--warning-5: #BA2525;
		--warning-6: #A61B1B;
		--warning-7: #911111;
		--warning-8: #780A0A;
		--warning-9: #610404;

		--caution-0: #FFFAEB;
		--caution-1: #FCEFC7;
		--caution-2: #F8E3A3;
		--caution-3: #F9DA8B;
		--caution-4: #F7D070;
		--caution-5: #E9B949;
		--caution-6: #C99A2E;
		--caution-7: #A27C1A;
		--caution-8: #7C5E10;
		--caution-9: #513C06;

		font-family: 'Roboto', sans-serif;
	}
`;

const App = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};

export default App;
