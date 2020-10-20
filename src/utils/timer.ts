interface Callback {
  (current: number): void
}

class TimerListener {
  private listeners: Set<Callback>
  private interval: number
  private timer: number

  public constructor(interval: number) {
    this.timer = -Infinity
    this.interval = interval
    this.listeners = new Set()
  }

  private handleInterval(): void {
    const current = Date.now()

    for (const listener of this.listeners) {
      listener(current)
    }
  }

  public addListener(listener: Callback): void {
    this.listeners.add(listener)

    if (!Number.isFinite(this.timer)) {
      this.timer = window.setInterval(
        () => this.handleInterval(),
        this.interval
      )
    }
  }

  public removeListener(listener: Callback): void {
    this.listeners.delete(listener)

    if (this.listeners.size === 0 && Number.isFinite(this.timer)) {
      window.clearInterval(this.timer)
      this.timer = -Infinity
    }
  }

  public clear(): void {
    this.listeners.clear()

    if (Number.isFinite(this.timer)) {
      window.clearInterval(this.timer)
      this.timer = -Infinity
    }
  }
}
