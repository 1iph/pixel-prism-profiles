
import React from 'react';

const Footer = () => {
  return (
    <footer className="glass mt-8 py-6 px-4 text-center">
      <p className="text-sm text-muted-foreground">
        This site is not affiliated with Hypixel or Mojang. All Minecraft related content belongs to Mojang Studios.
      </p>
      <p className="text-xs mt-2">
        <a href="https://api.hypixel.net/" className="hypixel-link" target="_blank" rel="noopener noreferrer">
          Hypixel API
        </a>{" "}
        |{" "}
        <a href="https://crafatar.com/" className="hypixel-link" target="_blank" rel="noopener noreferrer">
          Crafatar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
