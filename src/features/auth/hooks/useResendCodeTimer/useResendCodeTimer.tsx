import { useEffect, useState } from "react";

const useResendCodeTimer = () => {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timer]);

	return [timer, setTimer] as const;
};

export { useResendCodeTimer };
