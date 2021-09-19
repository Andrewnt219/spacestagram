declare module '@mars-rover-api' {
  type Rover = {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: 'active' | 'deactive';
    max_sol: number;
    max_date: string;
    total_photos: number;
    camera: {
      id: number;
      name: string;
      rover_id: number;
      full_name: string;
    }[];
  };
  type MarsRoversResponse = { rovers: Rover[] };
  type MarsRoverResponse = { rover: Rover };
  type MarsRoverQuery = {
    rover_name: string;
  };
}
