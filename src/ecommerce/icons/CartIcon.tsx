function CartIcon({size}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#1ABCFE"
      height={size}
      width={size}
    >
      <path d="M17 18a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 011 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63-.03.12a.25.25 0 00.25.25H19v2H7a2 2 0 01-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16z" />
    </svg>
  );
}

export default CartIcon;