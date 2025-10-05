import React from 'react';
import image from '../assets/image.jpg';

const LinksSection = () => (
  <section className="links-wrapper" id="links">
    <h2>Links</h2>
    <ul>
      <li><a href="http://www.kubsu.ru/index.php">KubSU</a></li>
      <li><a href="https://www.kubsu.ru/index.php">KubSU</a></li>
      <li id="image"><a href="https://www.kubsu.ru/index.php"><img className="img-links"
        src={image} alt="Flower" /></a></li>
      <li><a href="inner.html">Inner Page</a></li>
      <li><a href="index.html">Main Page</a></li>
      <li><a href="#image">Link to Image</a></li>
      <li><a href="https://www.kubsu.ru/ru/timetable?page=1&name=student&id=453">KubSU Timetable</a></li>
      <li><a href="https://www.kubsu.ru/ru/timetable?id=453">KubSU Timetable</a></li>
      <li><a href="inner.html">Link on Inner Page</a></li>
      <li><a href="about/something.html">Link on about/something</a></li>
      <li><a href="../byte.html">Link on ../byte</a></li>
      <li><a href="../../bit.html">Link on ../../bit</a></li>
      <li>
        <p>This <a href="https://www.kubsu.ru/index.php">link</a> to KubSU</p>
      </li>
      <li><a href="https://www.kubsu.ru/index.php#section-footer">This link to KubSU footer</a></li>
      <li>
        <img className="img-links" src={image} useMap="#map-rect-circle" alt="Flower" />
        <map name="map-rect-circle">
          <area shape="rect" coords="27,62,229,161" href="https://www.kubsu.ru/index.php"
            alt="Flower" />
          <area shape="circle" coords="75,75,75" href="https://www.kubsu.ru/index.php" alt="Flower" />
        </map>
      </li>
      <li><a href="">Link to Nothing</a></li>
      <li><a>Link without href</a></li>
      <li><a href="https://www.kubsu.ru/index.ph" rel="nofollow">No follow link</a></li>
      <li>
        {/* <noindex> */}
          <a href="https://www.kubsu.ru/index.php">No index link</a>
        {/* </noindex> */}
      </li>
      <li>
        <ol>
          <li><a href="" title="First Link">First Link</a></li>
          <li><a href="" title="Second Link">Second Link</a></li>
          <li><a href="" title="Third Link">Third Link</a></li>
        </ol>
      </li>
      <li><a href="ftp://user:pass123@something.ru/tmp/text.txt">FTP link</a></li>
    </ul>
  </section>
);

export default LinksSection;
