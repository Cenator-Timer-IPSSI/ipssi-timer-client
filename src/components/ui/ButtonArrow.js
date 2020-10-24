//React ---
import React from 'react';

const ButtonArrow = ({ width = '1rem', height = '1rem', fill = '#000', classStyle = '' }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classStyle}
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 18 18"
		>
			<path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z" />
		</svg>
	);
};

export default ButtonArrow;
