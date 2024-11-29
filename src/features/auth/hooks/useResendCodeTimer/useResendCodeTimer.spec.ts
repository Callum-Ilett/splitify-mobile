import { useResendCodeTimer } from "./useResendCodeTimer";
import { renderHook } from "@testing-library/react-native";
import { act } from "react";

describe("useResendCodeTimer", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should initialize with timer at 0", () => {
		// Arrange
		const { result } = renderHook(() => useResendCodeTimer());
		const [timer] = result.current;

		// Assert
		expect(timer).toBe(0);
	});

	it("Should count down when timer is set to a positive number", () => {
		// Arrange
		const { result } = renderHook(() => useResendCodeTimer());
		const [, setTimer] = result.current;

		// Act
		act(() => {
			setTimer(3);
		});

		// Assert initial state
		expect(result.current[0]).toBe(3);

		// Act - advance timer by 1 second
		act(() => {
			jest.advanceTimersByTime(1000);
		});

		// Assert
		expect(result.current[0]).toBe(2);

		// Act - advance timer by 2 more seconds
		act(() => {
			jest.advanceTimersByTime(2000);
		});

		// Assert
		expect(result.current[0]).toBe(0);
	});

	it("Should stop counting when timer reaches 0", () => {
		// Arrange
		const { result } = renderHook(() => useResendCodeTimer());
		const [, setTimer] = result.current;

		// Act
		act(() => {
			setTimer(1);
		});

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		// Assert
		expect(result.current[0]).toBe(0);
	});

	it("Should cleanup interval on unmount", () => {
		// Arrange
		const clearIntervalSpy = jest.spyOn(global, "clearInterval");
		const { result, unmount } = renderHook(() => useResendCodeTimer());
		const [, setTimer] = result.current;

		// Act
		act(() => {
			setTimer(5);
		});

		unmount();

		// Assert
		expect(clearIntervalSpy).toHaveBeenCalled();
	});
});
