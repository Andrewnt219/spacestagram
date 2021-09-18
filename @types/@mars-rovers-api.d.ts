declare module '@mars-rover-api' {
  type Rover = {
    id: string;
    name: string;
    landing_date: string;
    launch_date: string;
    status: 'active' | 'deactive';
    max_sol: number;
    max_date: string;
    total_photos: number;
    camera: {
      id: string;
      name: string;
      rover_id: string;
      full_name: string;
    }[];
  };
  type MarsRoversResponse = { rovers: Rover[] };
  type MarsRoverResponse = { rover: Rover };
  type MarsRoverQuery = {
    rover_id: string;
  };
}
