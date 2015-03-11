#ifndef STATS_THREAD_H
#define STATS_THREAD_H

#define MAX_IFACE_LEN 16
#define SAMPLES_PER_FRAME 10

struct sample {
	struct timespec timestamp;
	uint64_t 	rx_bytes;
	uint64_t 	tx_bytes;
	uint32_t 	rx_bytes_delta;
	uint32_t 	tx_bytes_delta;
	uint32_t 	rx_packets;
	uint32_t 	rx_packets_delta;
	uint32_t 	tx_packets;
	uint32_t 	tx_packets_delta;
};

struct iface_stats {
	uint32_t 	sample_period_us;
	char	 	iface[MAX_IFACE_LEN];
	struct sample 	samples[SAMPLES_PER_FRAME];
};

int stats_thread_init(void (*stats_handler) (struct iface_stats * counts));
void stats_monitor_iface(const char *_iface);

/* microseconds */
void set_sample_period(int sample_period_us);
int get_sample_period();

#endif
