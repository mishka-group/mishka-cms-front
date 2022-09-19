import type { NextPage } from 'next';

/**
 * It returns a div with a class name of "cright" and the text "Made by Mishka.Group © 2020-2022"
 * @returns A React component
 */
const Cright: NextPage = () => {
  return (
    <div id="cright-inside" data-phx-component="4">
      <div className="space20"></div>
      <p className="cright">Made by Mishka.Group © 2020-2022</p>
      <div className="space20"></div>
    </div>
  );
};

export default Cright;
